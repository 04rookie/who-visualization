import CardContainer from "./CardContainer";

export default async function PageContainer() {
  const res = await fetch("https://dw.euro.who.int/api/v3/data_sets/HFA");
  const resJson = await res.json();
  return (
    <main className="h-full">
      <CardContainer measures={resJson?.measures} />
    </main>
  );
}
