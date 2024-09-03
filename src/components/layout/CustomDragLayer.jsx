import { useDragLayer } from "react-dnd";
import Card from "./Card";

const CustomDragLayer = () => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    left: 0,
    top: 0,
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
    WebkitTransform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
    zIndex: 1000,
  };

  return (
    <div style={layerStyles}>
      <div className="w-24 h-36 flex items-center justify-center">
        <Card card={item.card} />
      </div>
    </div>
  );
};

export default CustomDragLayer;
