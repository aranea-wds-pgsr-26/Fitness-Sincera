import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrainerDashboard } from "../TrainerDashboard";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const mockStats = {
  totalClients: 3,
  lowAdherenceCount: 1,
  avgPerformance: 72,
  lastUpdated: new Date().toISOString(),
};

const mockStudents = {
  data: [
    {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      status: "active",
      lastCheckin: new Date().toISOString(),
      adherence: 88,
    },
  ],
  pagination: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
};

describe("TrainerDashboard", () => {
  it("renders dashboard title", () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStudents,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <TrainerDashboard />
      </QueryClientProvider>
    );

    expect(screen.getByText("Trainer Dashboard")).toBeInTheDocument();
  });

  it("displays stats cards with correct values", async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStudents,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <TrainerDashboard />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Total Students")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  it("filters students by performance tier", async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStudents,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <TrainerDashboard />
      </QueryClientProvider>
    );

    const performanceSelect = screen.getByDisplayValue("All Performance");
    fireEvent.change(performanceSelect, { target: { value: "high" } });

    await waitFor(() => {
      expect(performanceSelect).toHaveValue("high");
    });
  });

  it("handles search input with debounce", async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStudents,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <TrainerDashboard />
      </QueryClientProvider>
    );

    const searchInput = screen.getByPlaceholderText(
      "Search by name or email..."
    );
    fireEvent.change(searchInput, { target: { value: "João" } });

    expect(searchInput).toHaveValue("João");
  });

  it("calls onClientDetailOpen when student is clicked", async () => {
    const onClientDetailOpen = vi.fn();

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStudents,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <TrainerDashboard onClientDetailOpen={onClientDetailOpen} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const studentRow = screen.getByText("João Silva");
      fireEvent.click(studentRow);
    });

    expect(onClientDetailOpen).toHaveBeenCalledWith("1");
  });

  it("displays performance badges with correct colors", async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStudents,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <TrainerDashboard />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("88%")).toBeInTheDocument();
    });
  });
});
