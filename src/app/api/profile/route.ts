import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAuthenticatedUserId } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("privy_user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data ?? null });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const body = await request.json();

    const { data, error } = await supabase
      .from("user_profiles")
      .upsert(
        {
          privy_user_id: userId,
          email: body.email ?? null,
          company_name: body.name ?? null,
          country: body.country ?? null,
          registration: body.registration ?? null,
          onboarding_complete: body.onboardingComplete ?? false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "privy_user_id" }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
