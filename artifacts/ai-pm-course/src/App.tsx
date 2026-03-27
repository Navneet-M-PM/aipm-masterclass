import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { AppLayout } from "@/components/layout";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Curriculum from "@/pages/curriculum";
import WeekView from "@/pages/week";
import LessonView from "@/pages/lesson";
import Capstone from "@/pages/capstone";
import Templates from "@/pages/templates";
import Tools from "@/pages/tools";
import Interview from "@/pages/interview";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/curriculum" component={Curriculum} />
        <Route path="/week/:weekId" component={WeekView} />
        <Route path="/lesson/:lessonId" component={LessonView} />
        <Route path="/capstone" component={Capstone} />
        <Route path="/templates" component={Templates} />
        <Route path="/tools" component={Tools} />
        <Route path="/interview" component={Interview} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
