import { Container, Grid } from "@radix-ui/themes";
import CardMain from "./CardMain";

export default function CardContainer(props) {
  return (
    <Container size="4">
      <Grid columns="3" gap="5" width="auto">
        {props?.measures?.map((measure, index) => {
          return <CardMain key={index} measure={measure} />;
        })}
      </Grid>
    </Container>
  );
}
