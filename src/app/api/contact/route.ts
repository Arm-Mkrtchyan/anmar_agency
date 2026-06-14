import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactRequestPayload, ContactResponsePayload } from "@/types/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body: ContactRequestPayload = await request.json();
    const { interests, email, phone, message } = body;

    if (!email || !phone || !interests || interests.length === 0) {
      console.warn("[API/Contact] Validation failed: Missing required fields.");
      const errorResponse: ContactResponsePayload = { error: "Missing required fields." };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #111; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Contact Request</h2>
        <p style="font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
        <p style="font-size: 16px;"><strong>Interests:</strong> ${interests.join(", ")}</p>
        ${
          message
            ? `<div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
                 <strong>Message:</strong><br/>
                 <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
               </div>`
            : ""
        }
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Anmar Agency <onboarding@resend.dev>",
      to: ["info@anmar.agency"],
      subject: `New Lead: ${email}`,
      html: htmlContent,
      replyTo: email,
    });

    if (error) {
      console.error("[API/Contact] Resend Delivery Error:", error);
      const errorResponse: ContactResponsePayload = { 
        error: error.message || "Failed to send email via provider." 
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    console.info(`[API/Contact] Email sent successfully. ID: ${data?.id}`);
    const successResponse: ContactResponsePayload = { success: true, id: data?.id };
    return NextResponse.json(successResponse, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`[API/Contact] Internal Server Error: ${errorMessage}`);
    
    const serverErrorResponse: ContactResponsePayload = { error: "Internal server error occurred." };
    return NextResponse.json(serverErrorResponse, { status: 500 });
  }
}
