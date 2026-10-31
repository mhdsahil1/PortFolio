import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Canvas Error caught by ErrorBoundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }

    return this.props.children
  }
}
