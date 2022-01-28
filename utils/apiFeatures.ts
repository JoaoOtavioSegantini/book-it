import { Query } from 'mongoose'
import { NextApiRequest } from 'next'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface apiConstructor {
  // eslint-disable-next-line @typescript-eslint/ban-types
  query: Query<any[], any, {}, any>
  queryStr: NextApiRequest['query']
}

interface Api {
  search: () => this
  filter: () => this
  pagination: (numPerPages: number) => this
}

class ApiFeatures implements apiConstructor, Api {
  // eslint-disable-next-line @typescript-eslint/ban-types
  query: Query<any[], any, {}, any>
  queryStr: NextApiRequest['query']

  constructor(query: any, querStr: any) {
    this.query = query
    this.queryStr = querStr
  }

  filter() {
    const queryCopy = { ...this.queryStr }

    // remove fields for query
    const removeFields = ['location', 'page']
    removeFields.forEach((el) => delete queryCopy[el])

    this.query = this.query.find(queryCopy)
    return this
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
  pagination(numPerPages: number) {
    const currentPage = Number(this.queryStr.page) || 1
    const skip = numPerPages * (currentPage - 1)
    this.query = this.query.limit(numPerPages).skip(skip)
    return this
  }
}

export default ApiFeatures
