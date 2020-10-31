import BusinessList from '../components/BusinessProfile/BusinessLIst'
// import Filters from '../components/BusinessProfile/Filters'

import { Grid } from '@material-ui/core'

export default function BusinessProfileList() {
  return (
    <Grid container>
      {/* <Grid item xs={2}>
        <Filters />
      </Grid> */}
      <Grid item xs={10}>
        <BusinessList />
      </Grid>

    </Grid>
  )

}