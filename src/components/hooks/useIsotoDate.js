const useIsotoDate = (isoDate)=>{
    let date = new Date();
    if(isoDate){
      date = new Date(isoDate);
    }
    return date.toISOString().split('T')[0];
}


export default useIsotoDate;