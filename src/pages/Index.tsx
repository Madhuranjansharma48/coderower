import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">CodeRower Assignment</h1>
          <p className="text-xl text-muted-foreground">
            Full-Stack Software Developer Trainee Assignment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Task 1: Fetch Configuration</CardTitle>
              <CardDescription>
                GET endpoint to retrieve 2D array for a given configuration ID
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Enter a configuration ID to fetch the corresponding 2D array data from the backend.
              </p>
              <Button asChild className="w-full">
                <Link to="/fetch-config">Go to Fetch Configuration</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Task 2: Update Remark</CardTitle>
              <CardDescription>
                PUT endpoint to update remark for a configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Update the remark for a specific configuration using the PUT API endpoint.
              </p>
              <Button asChild className="w-full">
                <Link to="/update-remark">Go to Update Remark</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Backend API Endpoints</CardTitle>
            <CardDescription>Make sure your backend is running on localhost:8080</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">
                  <span className="text-success font-semibold">GET</span> /api/configurations/{'{id}'}
                </code>
                <p className="text-xs text-muted-foreground mt-1">
                  Returns a 2D array for the given configuration ID
                </p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">
                  <span className="text-primary font-semibold">PUT</span> /api/configurations/{'{id}'}
                </code>
                <p className="text-xs text-muted-foreground mt-1">
                  Updates the remark for the given configuration ID
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
