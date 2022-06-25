import axios from "axios";
import Swal from "sweetalert2";
import base_url from '../helper/base_url';

const url = base_url + '/jobs';

export const getJobsByPage = (page, data) => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: "GET_JOBS_BY_PAGE",
      payload: {
        status: "loading",
        data: "Loading",
      },
    });

    // Success
    await axios({
      method: "GET",
      url: url + "/" + page + (data ? `/${data}` : ""),
      data: data,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        dispatch({
          type: "GET_JOBS_BY_PAGE",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        dispatch({
          type: "GET_JOBS_BY_PAGE",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getJobById = (id) => {
  return (dispatch) => {
    // Loading
    dispatch({
      type: "GET_JOB_BY_ID",
      payload: {
        status: "loading",
        data: "Loading",
      },
    });

    // Success
    axios({
      method: "GET",
      url: url + "/info/" + id,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        dispatch({
          type: "GET_JOB_BY_ID",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        dispatch({
          type: "GET_JOB_BY_ID",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const createJob = (data) => {
  return (dispatch) => {
    // Loading
    dispatch({
      type: "CREATE_JOB",
      payload: {
        status: "loading",
        data: "Loading",
      },
    });

    // Success
    axios({
      method: "POST",
      url: url,
      data: data,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        Swal.fire(
          'Success!',
          'Job has been created!',
          'success'
        )
        dispatch({
          type: "CREATE_JOB",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        dispatch({
          type: "CREATE_JOB",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

// export const getOrdersByUserId = () => {
//   return (dispatch) => {
//     // Loading
//     dispatch({
//       type: "GET_ORDERS_BY_USER_ID",
//       payload: {
//         status: "loading",
//         data: "Loading",
//       },
//     });

//     // Success
//     axios({
//       method: "GET",
//       url: url + "/orders/",
//       timeout: 5000,
//       headers: {
//         access_token: localStorage.getItem("access_token"),
//       },
//     })
//       .then((response) => {
//         dispatch({
//           type: "GET_ORDERS_BY_USER_ID",
//           payload: {
//             status: "data",
//             data: response.data,
//           },
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//         dispatch({
//           type: "GET_ORDERS_BY_USER_ID",
//           payload: {
//             status: "error",
//             data: error.message,
//           },
//         });
//       });
//   };
// };

// export const checkout = () => {
//   return async (dispatch) => {
//     // Loading
//     dispatch({
//       type: "CHECKOUT",
//       payload: {
//         status: "loading",
//         data: "Loading",
//       },
//     });

//     // Success
//     await axios({
//       method: "POST",
//       url: url + "/carts/checkout",
//       headers: {
//         access_token: localStorage.getItem("access_token"),
//       },
//     })
//       .then((response) => {
//         dispatch({
//           type: "CHECKOUT",
//           payload: {
//             status: "data",
//             data: response.data,
//           },
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//         dispatch({
//           type: "CHECKOUT",
//           payload: {
//             status: "error",
//             data: error.message,
//           },
//         });
//       });
//   };
// };

// export const addViews = (id) => {
//   return async (dispatch) => {
//     // Loading
//     dispatch({
//       type: "ADD_VIEWS",
//       payload: {
//         status: "loading",
//         data: "Loading",
//       },
//     });

//     // Success
//     await axios({
//       method: "PUT",
//       url: url + "/products/views/" + id,
//       headers: {
//         access_token: localStorage.getItem("access_token"),
//       },
//     })
//       .then((response) => {
//         dispatch({
//           type: "ADD_VIEWS",
//           payload: {
//             status: "data",
//             data: response.data,
//           },
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//         dispatch({
//           type: "ADD_VIEWS",
//           payload: {
//             status: "error",
//             data: error.message,
//           },
//         });
//       });
//   };
// };

// export const editLineItem = (id, data) => {
//   return async (dispatch) => {
//     // Loading
//     dispatch({
//       type: "EDIT_LINE_ITEM",
//       payload: {
//         status: "loading",
//         data: "Loading",
//       },
//     });

//     // Success
//     await axios({
//       method: "PUT",
//       url: url + "/carts/edit/" + id,
//       data: data,
//       headers: {
//         access_token: localStorage.getItem("access_token"),
//       },
//     })
//       .then(async (response) => {
//         await Swal.fire("Success!", "Item(s) has been updated!", "success");
//         dispatch({
//           type: "EDIT_LINE_ITEM",
//           payload: {
//             status: "data",
//             data: response.data,
//           },
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//         dispatch({
//           type: "EDIT_LINE_ITEM",
//           payload: {
//             status: "error",
//             data: error.message,
//           },
//         });
//       });
//   };
// };

// export const deleteLineItem = (id) => {
//   return async (dispatch) => {
//     // Loading
//     dispatch({
//       type: "DELETE_LINE_ITEM",
//       payload: {
//         status: "loading",
//         data: "Loading",
//       },
//     });

//     // Success
//     await axios({
//       method: "DELETE",
//       url: url + "/carts/delete/" + id,
//       headers: {
//         access_token: localStorage.getItem("access_token"),
//       },
//     })
//       .then((response) => {
//         Swal.fire("Success!", "Item(s) has been deleted!", "success");
//         dispatch({
//           type: "DELETE_LINE_ITEM",
//           payload: {
//             status: "data",
//             data: response.data,
//           },
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//         dispatch({
//           type: "DELETE_LINE_ITEM",
//           payload: {
//             status: "error",
//             data: error.message,
//           },
//         });
//       });
//   };
// };

// export const updatePayment = (id) => {
//   return async (dispatch) => {
//     // Loading
//     dispatch({
//       type: "UPDATE_PAYMENT",
//       payload: {
//         status: "loading",
//         data: "Loading",
//       },
//     });

//     // Success
//     await axios({
//       method: "PUT",
//       url: url + "/orders/payment/" + id,
//       headers: {
//         access_token: localStorage.getItem("access_token"),
//       },
//     })
//       .then((response) => {
//         dispatch({
//           type: "UPDATE_PAYMENT",
//           payload: {
//             status: "data",
//             data: response.data,
//           },
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//         dispatch({
//           type: "UPDATE_PAYMENT",
//           payload: {
//             status: "error",
//             data: error.message,
//           },
//         });
//       });
//   };
// };

// export const cancelOrder = (id) => {
//   return async (dispatch) => {
//     // Loading
//     dispatch({
//       type: "CANCEL_ORDER",
//       payload: {
//         status: "loading",
//         data: "Loading",
//       },
//     });

//     // Success
//     await axios({
//       method: "PUT",
//       url: url + "/orders/cancel/" + id,
//       headers: {
//         access_token: localStorage.getItem("access_token"),
//       },
//     })
//       .then((response) => {
//         Swal.fire("Cancelled!", "The order has been cancelled!", "success");
//         dispatch({
//           type: "CANCEL_ORDER",
//           payload: {
//             status: "data",
//             data: response.data,
//           },
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//         dispatch({
//           type: "CANCEL_ORDER",
//           payload: {
//             status: "error",
//             data: error.message,
//           },
//         });
//       });
//   };
// };
