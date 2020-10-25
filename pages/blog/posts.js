import { PostAddSharp } from '@material-ui/icons';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'

import Button from  '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
      width: 280,
      maxWidth: 280,
      height: 400,
      maxHeight: 400
    },
    media: {
      height: 200,
    },

    blogContainer: {
        position: 'absolute',
        top: '50%',
        margin: 'auto',
        width: '75%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
        marginLeft: '12.5%'
    }
}));


function WPPosts({posts}) { 
    
    const classes = useStyles();

    return (

        <div className={classes.blogContainer}>    
            <Typography variant="h2" style={{marginBottom: '30px'}}> Contents </Typography>
            <Grid container spacing={2}> 
                {posts.map (post => (
                   <Grid item xs={3}>      
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image={post.imgSrc}
                            title="image"
                        />
                        <CardContent style={{height: 150}}>
                            <Typography gutterBottom variant="h5" component="h2" style={{height: 50}}>
                                {post.title.rendered} 
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <div style={{textAlign:'center'}} dangerouslySetInnerHTML={{__html: post.excerpt.rendered.slice(0,100) + '...'}}/>
                            </Typography>
                        </CardContent>
                        <Button variant="contained" color="secondary"> 
                            <Link 
                            href={`/blog/${post.id}`}
                            > 
                                Read More
                            </Link>
                         </Button>

                        </Card> 
                    </Grid>   

                ))}
            </Grid>
        </div> 
    )
        

}

export async function  getStaticProps(){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await axios.get( 'http://bbonggucom.local//wp-json/wp/v2/posts')
    let posts = response.data
    for (let post of posts) {
        const media = await axios.get(`http://bbonggucom.local//wp-json/wp/v2/media?parent=${post.id}`)

        post.imgSrc = media.data[0] && media.data[0].source_url || ""
    }
    return {
        props: {posts}
      }
}

export default WPPosts