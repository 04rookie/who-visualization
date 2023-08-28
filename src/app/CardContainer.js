import { Container, Grid } from "@radix-ui/themes";
import CardMain from "./CardMain";

export default function CardContainer(props) {
  return (
    <Grid
      columns={{ initial: "1", xl: "4", sm: "3" }}
      py="4"
      px="9"
      gap="5"
      width="auto"
      shrink="1"
    >
      {props?.measures?.map((measure, index) => {
        return <CardMain key={index} measure={measure} />;
      })}
    </Grid>
  );
}
