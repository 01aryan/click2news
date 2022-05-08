import { Box, Button, Card, styled } from "@mui/material";
import { H1, Paragraph } from "components/Typography";
import { useTranslation } from "react-i18next"; // styled components

const StyledCard = styled(Card)(({
  theme
}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 3rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    padding: "2rem",
    "& img": {
      marginBottom: "1.5rem"
    }
  }
})); // component props interface

const Footer = ({
  imageLink
}) => {
  const {
    t
  } = useTranslation();
  return <StyledCard>
      <Box>
        <H1 fontSize={24}>{t("Click2News")}</H1>
        <Paragraph fontSize={13} color="secondary.400" fontWeight="500">
          {t("News on your fingertips")}
        </Paragraph>
        <Button variant="contained" size="small" sx={{
        mt: "2rem"
      }}>
          Buy Now
        </Button>
      </Box>

      <Box>
        <img src={imageLink} alt="saas-dasboard-footer" />
      </Box>
    </StyledCard>;
};

export default Footer;