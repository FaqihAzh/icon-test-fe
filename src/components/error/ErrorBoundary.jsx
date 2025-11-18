import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-danger-100 p-4 rounded-full">
                <AlertTriangle className="w-12 h-12 text-danger-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Terjadi Kesalahan
              </h1>
              <p className="text-gray-600">
                Maaf, terjadi kesalahan yang tidak terduga. Silakan muat ulang halaman.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-gray-100 p-4 rounded-md text-left">
                <p className="text-xs text-gray-700 font-mono break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <Button 
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Muat Ulang
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}