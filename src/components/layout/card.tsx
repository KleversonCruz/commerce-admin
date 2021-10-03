export default function Card(props) {
    return (
        <div className="overflow-hidden shadow rounded-lg divide-y 
            divide-gray-200 dark:divide-warmGray-900 bg-gray-50 dark:bg-warmGray-800 "
        >
            {props.children}
        </div>

    )
}
