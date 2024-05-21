import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

// TODO - Change this to refresh an "episode" tag

export async function GET() {
	console.log('Revalidating episodes')
	revalidatePath('/episodes')
	return Response.json({ success: true })
}
