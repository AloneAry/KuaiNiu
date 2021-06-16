import Mock from 'mockjs'
import Data from './data.json'

Mock.mock('/info',{code:0,data:Data.info})

Mock.mock('/goods',{code:0,data:Data.goods})

Mock.mock('/ratings',{code:0,data:Data.ratings})