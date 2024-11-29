import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useCallback } from "react";
import { Board } from "../../data/board";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";

const Home = () => {
  const [columns, setColumns] = useState(Board);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");

  // Open modal when user clicks to add task
  const openModal = (columnId) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle adding a new task
  const handleAddTask = (taskData) => {
    const newBoard = { ...columns };
    if (selectedColumn) {
      newBoard[selectedColumn].items.push(taskData);
      setColumns(newBoard); // Update the board with the new task
    }
  };

  // Memoize onDragEnd function to optimize re-renders
  const handleOnDragEnd = useCallback(
    (result) => onDragEnd(result, columns, setColumns),
    [columns] // Only recalculate if columns change
  );

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="w-full flex items-start justify-between px-5 pb-8 gap-8">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="w-full flex flex-col gap-4">
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task, index) => (
                      <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <Task provided={provided} task={task} />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                onClick={() => openModal(columnId)}
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
              >
                <AddOutline color="#555" />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
    </>
  );
};

export default Home;
