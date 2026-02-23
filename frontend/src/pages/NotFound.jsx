const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="/404_NotFound.png"
        alt="A 404 error page"
        className="max-w-full mb-6 w-96"
      />
      <h2 className="font-bold">Bạn đang đi vào dùng cấm địa</h2>
      <a
        href="/"
        className="inline-block px-2 py-1 mt-3 font-medium text-white rounded bg-primary hover:bg-primary-dark animation"
      >
        Quay về trang chủ
      </a>
    </div>
  );
};
export default NotFound;
