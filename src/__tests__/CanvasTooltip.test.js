import { render, screen } from "@testing-library/react";
import CanvasTooltip from "../components/canvasTooltip/canvasTooltip.component";
import { StateContext, LivestateContext } from "../context/ProjectDataContext";

const mockState = {};
const mockLivestate = {};
jest.mock("../context/ProjectDataContext", () => ({
  StateContext: [mockState],
  LivestateContext: [mockLivestate],
}));

test("renders the CanvasTooltip component with correct position", () => {
  render(<CanvasTooltip />);
  const tooltipElement = screen.getByTestId("canvas-tooltip");

  // Assert the tooltip position style
  expect(tooltipElement.style.left).toBe("0px");
  expect(tooltipElement.style.top).toBe("0px");

  // You can also assert the presence of the SidebarUnit component if needed
  // const sidebarUnitElement = screen.getByTestId('sidebar-unit');
  // expect(sidebarUnitElement).toBeInTheDocument();
});
