import { reqAddCategory,requpdataCategory,delCategory } from '../../api';
import { POST_ADD_DATA,UPDAT_ECATEGORYA_SYNC,POST_DEL_DATA } from '../action-types/user';

const gitAddData = (mydata) => ({
  type: POST_ADD_DATA,
  data: mydata
})

const gitupdata = (mydata) => ({
  type: UPDAT_ECATEGORYA_SYNC,
  data: mydata
})

const gitdeldata = (mydata) => ({
  type: POST_DEL_DATA,
  data: mydata
})

export const gitAddDataAsync = (mydata) => {
  return (dispath) => {
    return reqAddCategory(mydata).then(
      (response) => {
        dispath(gitAddData(response))
      }
    )
  }
}

export const updateCategoryAsync = (categoryId,categoryName) => {
  return (dispath) => {
    return requpdataCategory(categoryId,categoryName)
    .then((response) => {
        dispath(gitupdata(response))
      }
    )
  }
}

//删除分类
export const delCategoryAsync = (categoryId) => {
  return (dispath) => {
    return delCategory(categoryId)
    .then((response) => {
        dispath(gitdeldata(response))
      }
    )
  }
}