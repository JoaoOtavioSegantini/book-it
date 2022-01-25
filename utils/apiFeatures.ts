/* eslint-disable @typescript-eslint/no-explicit-any */
interface apiConstructor {
  query: any
  queryStr: any
}

interface Api {
  search(): any
}

class ApiFeatures implements apiConstructor, Api {
  query: any
  queryStr: any
  constructor(query: any, querStr: any) {
    this.query = query
    this.queryStr = querStr
  }
  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i'
          }
        }
      : {}
    this.query = this.query.find({ ...location })
    return this
  }
}

export default ApiFeatures
