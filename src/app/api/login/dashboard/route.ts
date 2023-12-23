import { LoginResponse } from "Response";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const data = request.body;

    return NextResponse.json({
      code: "200",
      status: "success",
      data: {
        token: "Bearer 123456",
      },
      messages: null,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        code: "999",
        data: null,
        message: error?.message,
      })
    );
  }
};
