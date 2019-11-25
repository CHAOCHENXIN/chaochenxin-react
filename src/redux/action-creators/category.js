import { reqGetCategories } from '../../api';
import { GET_CATEGORIES_SUCCESS } from '../action-types/user'

const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  data: categories
})

export const getCategoriesAsync = () => {
  return (dispath) => {
    return reqGetCategories().then(
      (response) => {
        dispath(getCategoriesSuccess(response))
      }
    )
  }
}