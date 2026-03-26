
function filterByCategory(category, event) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const categoryMap = {
        'All': 'All',
        '채팅봇': 'Chatbot',
        '영상': 'Video',
        '이미지': 'Image',
        '글쓰기': 'Writing',
        '코딩': 'Coding',
        '오디오': 'Audio'
    };

    currentCategory = categoryMap[category] || category;
    const query = document.getElementById('search-input').value;
    render(query);
}
