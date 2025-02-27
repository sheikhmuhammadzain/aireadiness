import React from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { List, Hamburger } from '@phosphor-icons/react';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const MenuLink = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    );
  });
  MenuLink.displayName = "MenuLink";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="/" className="text-xl sm:text-2xl font-bold text-primary">
                AI Readiness
              </a>
              <nav className="hidden md:flex">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Assessment</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4">
                          <li>
                            <MenuLink href="/assessment" title="Take Assessment">
                              Start your AI readiness assessment journey
                            </MenuLink>
                          </li>
                          <li>
                            <MenuLink href="/results" title="View Results">
                              Check your assessment results and recommendations
                            </MenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4">
                          <li>
                            <MenuLink href="/best-practices" title="Best Practices">
                              Learn about AI implementation best practices and guidelines
                            </MenuLink>
                          </li>
                          <li>
                            <MenuLink href="/documentation" title="Documentation">
                              Access detailed documentation and technical guides
                            </MenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex gap-4">
                <Button variant="outline" size="sm">Sign In</Button>
                <Button size="sm">Get Started</Button>
              </div>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Hamburger className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    <a href="/assessment" className="block py-2 text-sm font-medium">
                      Take Assessment
                    </a>
                    <a href="/results" className="block py-2 text-sm font-medium">
                      View Results
                    </a>
                    <a href="/best-practices" className="block py-2 text-sm font-medium">
                      Best Practices
                    </a>
                    <a href="/documentation" className="block py-2 text-sm font-medium">
                      Documentation
                    </a>
                    <div className="flex flex-col gap-2 sm:hidden mt-4">
                      <Button variant="outline" className="w-full">Sign In</Button>
                      <Button className="w-full">Get Started</Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
              2024 AI Readiness Assessment. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 order-1 sm:order-2">
              <Button variant="ghost" size="sm">Privacy Policy</Button>
              <Button variant="ghost" size="sm">Terms of Service</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;