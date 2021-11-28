import React from "react";
import cities from '../../data/cities/cities.js'

const getCityName = (person) => {
    const city = cities.find(city => city.kladr_id === person.city) ;
    return city?.city || city?.region;
}

const UserList = ({users}) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {users && users.map((person) => (
                <tr key={person.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full"
                                     src={person.image || 'https://unsplash.com/photos/mFadZWL9UiI/download?force=true&w=640} alt=""'}/>
                            </div>
                            <div className="ml-4">
                                <div
                                    className="text-sm font-medium text-gray-900">{person.initials}</div>
                                <div
                                    className="text-sm text-gray-500">{person.firstName}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">  { getCityName(person)  }</div>
                        <div className="text-sm text-gray-500">{ person.department }</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                        </a>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default UserList
