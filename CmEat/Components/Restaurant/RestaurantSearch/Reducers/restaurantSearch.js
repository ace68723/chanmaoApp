const initialState = [{
  isTagClicked: false,
  clickedAreaTag: {},
  clickedFlavorTag: {},
  restaurantList: [],
  searchText: '',
}]

export default function restaurantSearch(state = initialState, action) {
  switch (action.type) {
    case "SET_SEARCH_TEST":
      return [
        ...state,
        {
          searchText: action.text,
          restaurantList: action.filteredData,
        }
      ]

    case "CLICKED_TAG":
      return [
        ...state,
        {
          isTagClicked: true,
          clickedFlavorTag: action.tag
        }
      ]
    case "UNCLICKED_TAG":
      return [
        ...state,
        {
          searchText: action.text,
          restaurantList: action.filteredData,
        }
      ]
    case "CLICKED_AREA":
      return [
        ...state,
        {
          isTagClicked: true,
          clickedAreaTag:action.tag,
          filteredRestaurant:action.filteredData,
          restaurantList:action.filteredData
        }
      ]
    case "CLEAN_INPUT_WITH_TAG":
      return [
        ...state,
        {
          searchText: '',
          restaurantList: action.filteredRestaurant
        }
      ]
    case "CLEAN_INPUT_WITHOUT_TAG":
      return [
        ...state,
        {
          searchText: '',
          restaurantList: [],
          filteredRestaurant: []
        }
      ]
    case "RESET":
      return [
        ...state,
        {
          isTagClicked: false,
          clickedAreaTag: {},
          clickedFlavorTag: {},
          restaurantList: [],
          searchText: '',
        }
      ]
    case "DELETE_AREA":
      return [
        ...state,
        {
          isTagClicked: false,
          clickedAreaTag: {},
          clickedFlavorTag: {},
          restaurantList: []
        }
      ]
    default:
      return state
  }
}
