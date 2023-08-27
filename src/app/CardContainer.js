import CardMain from "./CardMain";

export default function CardContainer(props) {
  return (
    <div className="px-20">
      <div className="grid grid-cols-4 gap-4">
        {props?.measures?.map((measure, index) => {
          return <CardMain key={index} measure={measure} />;
        })}
      </div>
    </div>
  );
}
