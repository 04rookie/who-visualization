import MeasureProperty from "@/Component/MeasureProperty";
export default async function dataset({ params }) {
  let resJson = null;
  try {
    const res = await fetch(
      `https://dw.euro.who.int/api/v3/data_sets/HFA/${params?.datasetId}`
    );
    resJson = await res.json();
  } catch (error) {
    console.log("Fetch failed due to: ", error);
  }
  // console.log(resJson);
  return (
    <div className="h-full w-full">
      {resJson == null ? (
        "Error in fetching dataset, please visit later"
      ) : (
        <MeasureProperty measure={resJson} />
      )}
    </div>
  );
}
