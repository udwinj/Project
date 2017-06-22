
// export const testActionFunc = function (item) {
//     return {
//         type: 'Add',
//         id: item
//     }
// }




export const switchContent = function(content){
      console.log("switchContent")
     console.log(content);
              
    return {
        type: 'Goto', 
        value: content,
    }
}