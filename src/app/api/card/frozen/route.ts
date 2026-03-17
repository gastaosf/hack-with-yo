import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAuthenticatedUserId } from "@/lib/auth";

export async function PATCH(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const { frozen } = await request.json();

    const { error } = await supabase
      .from("user_profiles")
      .update({ card_frozen: frozen, updated_at: new Date().toISOString() })
      .eq("privy_user_id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ frozen });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
