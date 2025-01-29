import 'outstatic/outstatic.css'
import { Outstatic } from 'outstatic'
import { OstClient } from 'outstatic/client'

export default async function Page({ params }: { params: { ost: string[] } }) {
  const ostData = await Outstatic()
  console.log("osData--->",ostData)
  return <OstClient ostData={ostData} params={params} />
}
