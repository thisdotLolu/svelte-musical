import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    const song = url.searchParams.get("song");
    if (!song) {
        return json({ error: "Song name is required" }, { status: 400 });
    }

    try {
        const res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(song)}`);
        const data = await res.json();
        
        if (data.data.length > 0) {
            return json({ preview_url: data.data[0].preview });
        } else {
            return json({ error: "Preview not found" }, { status: 404 });
        }
    } catch (error) {
        return json({ error: 'an error occured' }, { status: 500 });
    }
}
