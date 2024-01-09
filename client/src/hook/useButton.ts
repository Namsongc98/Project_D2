const useButton = () => {
    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
    }
    return {
        onClick
    }
}

export default useButton



