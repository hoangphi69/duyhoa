export default function Contact() {
  return (
    <div className="space-y-6">
      <h1 className="font-extrabold text-gray-900 text-4xl">Liên hệ</h1>
      <p className="text-gray-600 text-lg">
        Hãy để lại thông tin, chúng tôi sẽ phản hồi sớm nhất.
      </p>

      {/* Basic form placeholder */}
      <form className="space-y-4 mt-8 max-w-md">
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Họ và tên
          </label>
          <input
            type="text"
            className="block shadow-sm mt-1 p-2 border border-gray-300 focus:border-blue-500 rounded-md focus:ring-blue-500 w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Email
          </label>
          <input
            type="email"
            className="block shadow-sm mt-1 p-2 border border-gray-300 focus:border-blue-500 rounded-md focus:ring-blue-500 w-full"
          />
        </div>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white transition"
        >
          Gửi tin nhắn
        </button>
      </form>
    </div>
  );
}
