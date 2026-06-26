import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NutritionistDashboard } from "../NutritionistDashboard";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const mockStats = {
  totalClients: 3,
  atRiskCount: 1,
  avgAdherence: 65,
  lastUpdated: new Date().toISOString(),
};

const mockClients = {
  data: [
    {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      status: "active",
      lastCheckin: new Date().toISOString(),
      adherence: 85,
    },
  ],
  pagination: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
};

describe("NutritionistDashboard", () => {
  it("renders dashboard title", () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockClients,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <NutritionistDashboard />
      </QueryClientProvider>
    );

    expect(
      screen.getByText("Nutritionist Dashboard")
    ).toBeInTheDocument();
  });

  it("displays stats cards with correct values", async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockClients,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <NutritionistDashboard />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Total Clients")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  it("filters clients by status", async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockClients,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <NutritionistDashboard />
      </QueryClientProvider>
    );

    const statusSelect = screen.getByDisplayValue("All Status");
    fireEvent.change(statusSelect, { target: { value: "active" } });

    await waitFor(() => {
      expect(statusSelect).toHaveValue("active");
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
        json: async () => mockClients,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <NutritionistDashboard />
      </QueryClientProvider>
    );

    const searchInput = screen.getByPlaceholderText(
      "Search by name or email..."
    );
    fireEvent.change(searchInput, { target: { value: "João" } });

    expect(searchInput).toHaveValue("João");
  });

  it("calls onClientDetailOpen when client is clicked", async () => {
    const onClientDetailOpen = vi.fn();

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockClients,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <NutritionistDashboard onClientDetailOpen={onClientDetailOpen} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const clientRow = screen.getByText("João Silva");
      fireEvent.click(clientRow);
    });

    expect(onClientDetailOpen).toHaveBeenCalledWith("1");
  });
});
