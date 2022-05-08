import { Avatar, Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, LinearProgress, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Skeleton, Typography } from "@mui/material";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ListIcon from '@mui/icons-material/List';
import { H5 } from "components/Typography";
import useTitle from "hooks/useTitle";
import { useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { primary } from "theme/themeColors";

// CHANGE 3: created news component for the page working at http://localhost:3000/news
// CHANGE 4: in package.json file added proxy for http://54.69.72.157:8090 otherwise CORS error would occur
const News = () => {
  useTitle("News");
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  const fetchNewsByCategory = (category = "") => {
    setSelectedCategory(category);
    setNewsData([]);
    var requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ category }),
        redirect: 'follow'
    };

    fetch("/fetch_top_news", requestOptions)
        .then(response => {
          return response.json();
        }).then(result => {
          setNewsData(result);
        })
        .catch(error => console.log('error', error));
    }

    const showDetails = (itemObj) => {
        setSelectedNews(itemObj);
    }
    const closeDialog = () => {
        setSelectedNews(null);
    }

    useEffect(() => {
    // debugger;
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };
    fetch("/fetch_news_categories", requestOptions)
        .then(response => {
        return response.json();
        }).then(result => {
        setCategories(result);
        })
        .catch(error => console.log('error', error));
    }, []);

    useEffect(() => {
        fetchNewsByCategory(selectedCategory);
    }, [selectedCategory]);

  return (
  <Box pt={2} pb={4}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
          <Card>
            <H5 mb={2} sx={{padding: 3}}>{t("Categories")}</H5>
            <List component="nav">
                {categories.length === 0 && <>{[1,2,3,4].map(i => <Skeleton key={i} animation="wave" variant="rectangular" width={'100%'} height={60} style={{marginBottom: "10px"}} />)}</>}
                {categories.length > 0 && 
                <>
                    <ListItem style={{padding: 0, backgroundColor: (selectedCategory === "" ? primary.light : "")}} disableGutters onClick={() => setSelectedCategory("")}>
                        <ListItemButton>
                            <ListItemIcon><ListIcon /></ListItemIcon>
                            <ListItemText primary={"All News"}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {
                        categories.map((item, index) => (
                            <ListItem key={index} style={{padding: 0, backgroundColor: selectedCategory === item ? primary.light : ""}} disableGutters onClick={() => setSelectedCategory(item)}>
                                <ListItemButton>
                                    <ListItemIcon><ListIcon /></ListItemIcon>
                                    <ListItemText primary={item && item.toUpperCase()}></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </>
                }
            </List>
          </Card>
      </Grid>

      <Grid item xs={12} md={9}>
        <Card sx={{padding: 3}}>
          <H5 mb={2}>{t(`Today's ${selectedCategory} News`)}</H5>
          {newsData.length === 0 && <CircularProgress />}
          {
            newsData.length > 0 && (
                <List>
                    {newsData.map((item, index) => (
                    <Fragment key={index}>
                        <ListItem alignItems="flex-start" onClick={() => showDetails(item)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <NewspaperIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.title} primaryTypographyProps={{fontSize: '125%'}} secondary={<Typography color="#999">{item.summary}</Typography>} />
                        </ListItem>
                        {index != newsData.length && <Divider variant="inset" component="li" />}
                    </Fragment>
                    ))}
                </List>
            )}
        </Card>
      </Grid>
    </Grid>
    <Dialog
        open={!!selectedNews}
        onClose={closeDialog}
    >
        <DialogTitle id="alert-dialog-title">News details</DialogTitle>
        <DialogContent>
            {
                selectedNews && 
                <>
                    <div><b>Title:</b> {selectedNews.title}</div>
                    <div><b>Publisher:</b> {selectedNews.source}</div>
                    <div><b>Date Publised:</b> {selectedNews.created_at}</div>
                    <Link href={selectedNews.url}>click here to read</Link>
                </>
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
    </Dialog>
  </Box>);
};

export default News;