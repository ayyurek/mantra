import { NextRequest } from "next/server";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
type ParamsProps = {
	params: {
		id: string;
	};
};

//change this based on the xpe server you need to target
const baseURL = process.env.BASE_URL;

export async function GET(request: NextRequest, { params }: ParamsProps) {
	const id = params.id;

	if (!id || typeof id !== "string") {
		return new Response("invalid id", { status: 400 });
	}

	const res = await fetch(`${baseURL}/api/results/${id}`);

	if (!res.ok) {
		if (res.status === 404) {
			return new Response(`Oops! We couldn't find a mantra with ID '${id}'.`, { status: 404 });
		} else {
			return new Response("Something didn't work, please try again.", { status: 500 });
		}
	}
	const data = await res.json();

	if (!("text" in data.widgetScore[0])) {
		return new Response("Uh oh! The mantra with this ID seems invalid.", { status: 400 });
	}

	const mantra = data.widgetScore[0].text;

	return Response.json({ mantra });
}
