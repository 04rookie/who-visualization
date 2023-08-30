import CardContainer from "./CardContainer";
import Navbar from "./Navbar";

export default async function Home() {
  const res = await fetch("https://dw.euro.who.int/api/v3/data_sets/HFA");
  const resJson = await res.json();
  return (
    <main className="h-full">
      {/* <Navbar /> */}
      <CardContainer measures={resJson?.measures} />
    </main>
  );
}
