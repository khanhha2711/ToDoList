const Footer = ({ completedTaskCount = 1, activeTaskCount = 1 }) => {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p>
            {completedTaskCount > 0 && (
              <>
                Tuyệt vời! Bạn đã hoàn thành {completedTaskCount} nhiệm vụ,{" "}
                {activeTaskCount > 0 &&
                  ` còn lại ${activeTaskCount} nhiệm vụ đang đợi bạn.`}
              </>
            )}
            {completedTaskCount === 0 && activeTaskCount > 0 && (
              <>Hãy bắt đầu làm việc nào!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};
export default Footer;
