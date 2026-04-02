import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const initialBoard = [
  {
    id: 'column-1',
    title: 'Backlog',
    cards: [
      { id: 'card-1', title: 'Collect requirements' },
      { id: 'card-2', title: 'Explore design directions' },
    ],
  },
  {
    id: 'column-2',
    title: 'In Progress',
    cards: [
      { id: 'card-3', title: 'Build API contract' },
      { id: 'card-4', title: 'Implement auth flow' },
    ],
  },
  {
    id: 'column-3',
    title: 'Review',
    cards: [{ id: 'card-5', title: 'Accessibility audit' }],
  },
];

let nextCardId = 6;
let nextColumnId = 4;

export default function App() {
  const [columns, setColumns] = useState(initialBoard);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [drafts, setDrafts] = useState({});

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setColumns((current) => {
      const next = [...current];
      const sourceColumn = next.find((column) => column.id === source.droppableId);
      const destinationColumn = next.find((column) => column.id === destination.droppableId);
      const [moved] = sourceColumn.cards.splice(source.index, 1);
      destinationColumn.cards.splice(destination.index, 0, moved);
      return next;
    });
  };

  const handleAddCard = (columnId) => {
    const text = (drafts[columnId] ?? '').trim();
    if (!text) return;
    setColumns((current) =>
      current.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: [...column.cards, { id: `card-${nextCardId++}`, title: text }],
            }
          : column,
      ),
    );
    setDrafts((prev) => ({ ...prev, [columnId]: '' }));
  };

  const handleAddColumn = () => {
    const title = newColumnTitle.trim();
    if (!title) return;
    setColumns((current) => [
      ...current,
      { id: `column-${nextColumnId++}`, title, cards: [] },
    ]);
    setNewColumnTitle('');
  };

  return (
    <div className="board-shell">
      <header>
        <h1>Trello Board Clone</h1>
        <p>Drag cards between columns, add new tasks, and expand the workflow.</p>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {columns.map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided, snapshot) => (
                <article
                  className={snapshot.isDraggingOver ? 'column dragging-over' : 'column'}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="column-header">
                    <h2>{column.title}</h2>
                    <span className="count">{column.cards.length}</span>
                  </div>
                  <div className="cards">
                    {column.cards.map((card, index) => (
                      <Draggable draggableId={card.id} index={index} key={card.id}>
                        {(dragProvided, dragSnapshot) => (
                          <div
                            className={dragSnapshot.isDragging ? 'card dragging' : 'card'}
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            {card.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  <div className="add-card">
                    <textarea
                      rows="2"
                      placeholder="Add a card..."
                      value={drafts[column.id] ?? ''}
                      onChange={(event) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [column.id]: event.target.value,
                        }))
                      }
                    />
                    <button type="button" onClick={() => handleAddCard(column.id)}>
                      Add Card
                    </button>
                  </div>
                </article>
              )}
            </Droppable>
          ))}
          <div className="add-column">
            <input
              type="text"
              placeholder="Add list"
              value={newColumnTitle}
              onChange={(event) => setNewColumnTitle(event.target.value)}
            />
            <button type="button" onClick={handleAddColumn}>
              Add List
            </button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
