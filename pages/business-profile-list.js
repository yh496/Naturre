import BusinessList from '../components/BusinessProfile/BusinessLIst'
import { Grid } from '@material-ui/core'

export default function BusinessProfileList() {
  return (
    <Grid container>
      <Grid item xs={2}>
        {/* //filter TODO */}
      </Grid>
      <Grid item xs={10}>
        <BusinessList />
      </Grid>

    </Grid>
  )
  // useEffect( () => {
  //   fetch('/api/business-profile/get-business-list', {
  //      method: 'POST',
  //      headers: { "Content-Type": "application/json; charset=utf-8" },
  //      body: JSON.stringify({id: '5f66f686f6dddb007ba26307'})

  //    }).then(e => e.json()).then(e =>
  //      setValues({...values, name: e.data.name, description: e.data.description, reviews: e.reviews})
  //    )

  //  }, [])

}