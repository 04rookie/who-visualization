import CardContainer from "./CardContainer";

export default async function Home() {
  const res = await fetch("https://dw.euro.who.int/api/v3/data_sets/HFA");
  const resJson = await res.json();
  return (
    <main>
      <CardContainer measures={resJson?.measures} />
    </main>
  );
}
