import CardContainer from "./CardContainer";

export default async function PageContainer() {
  let resJson = null;
  try {
    const res = await fetch("https://dw.euro.who.int/api/v3/data_sets/HFA");
    resJson = await res.json();
  } catch (error) {
    console.log("Fetch failed due to: ", error);
  }
  return (
    <main className="h-full">
      {resJson == null ? (
        "Error in fetching dataset, please visit later"
      ) : (
        <CardContainer measures={resJson?.measures} />
      )}
    </main>
  );
}
