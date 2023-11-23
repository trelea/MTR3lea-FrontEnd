
export const StepOne = ({firstForm, setFirstForm}) => {
    return (
        <form className="mt-6">
            <div>
                <label for="email" className="block text-sm text-gray-800 ">Email</label>
                <input 
                type="email" 
                required="true"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none" 
                placeholder="email"
                onChange={(e) => {
                    setFirstForm({
                        ...firstForm,
                        email: e.target.value
                    })
                }}/>        
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <label for="username" className="block text-sm text-gray-800 ">Username</label>
                </div>
                <input 
                type="text" 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none" 
                placeholder="username"
                onChange={(e) => {
                    setFirstForm({
                        ...firstForm,
                        username: e.target.value
                    })
                }}/>
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <label for="date" className="block text-sm text-gray-800 ">Date</label>
                </div>
                <input 
                type="date" 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:outline-none" 
                placeholder="date"
                onChange={(e) => {
                    setFirstForm({
                        ...firstForm,
                        date: e.target.value
                    })
                }}/>
            </div>
        </form>
    )             
}