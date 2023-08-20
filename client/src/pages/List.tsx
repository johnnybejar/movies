function List() {
  return (
    <div className="flex flex-wrap">
      <div className="flex flex-col items-center">
        <img
          className="max-w-xs"
          src="./public/assets/hardcoded-images/infinitywars.jpg"
        />
        <span>Avenger: Infinity War</span>
      </div>
      <div className="flex flex-col items-center">
        <img
          className="max-w-xs"
          src="./public/assets/hardcoded-images/ratatouille.jpg"
        />
        <span>Ratatouille</span>
      </div>
      <div className="flex flex-col items-center">
        <img
          className="max-w-xs"
          src="./public/assets/hardcoded-images/childrenofmen.jpg"
        />
        <span>Children of Men</span>
      </div>
    </div>
  );
}

export default List;
