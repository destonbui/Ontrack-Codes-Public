const projects = [
  {
    id: 1,
    createdBy: "User",
    title: "Project 1",
    tags: ["Urgent", "High Priority"],
    timestamp: new Date(),
    deadline: undefined,
    tasks: [
      {
        id: 1,
        title: "Study",
        desc: "Learn javascript",
        timestamp: new Date(),
        deadline: "tomorrow",
        status: "In progress.",
        attachment: "ABC.pdf",
        createdBy: "User",
        assignees: [],
        comments: [
          {
            id: 1,
            timestamp: new Date(),
            user: "User",
            comment: "Where do I submit this?",
            replies: [
              {
                id: 1,
                timestamp: new Date(),
                user: "User",
                comment: "Use the file upload.",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
    assignees: [
      {
        userId: "001",
        username: "Deston",
        firstName: "Deston",
        lastName: "Bui",
        role: "Team leader",
        avatar: "abc.jpg",
      },
    ],
  },
];
