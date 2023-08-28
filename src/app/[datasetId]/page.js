import MeasureProperty from "@/Component/MeasureProperty";
export default async function dataset({ params }) {
  const res = await fetch(
    `https://dw.euro.who.int/api/v3/data_sets/HFA/${params?.datasetId}`
  );
  const resJson = await res.json();
  // console.log(resJson);
  return <div className="h-full w-full"><MeasureProperty measure={resJson} /></div>;
}
