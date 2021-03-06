# -*- rpm-spec -*-
Summary:        gcompris-qt
Name:           @GCOMPRIS_EXECUTABLE_NAME@
Version:        @GCOMPRIS_MAJOR_VERSION@.@GCOMPRIS_MINOR_VERSION@
Release:        1
License:        GPLv3
Group:          unknown
Url: https://www.gcompris.org


Buildarch: @BUILD_ARCH@
Prefix: /usr

%define _rpmdir @CMAKE_BINARY_DIR@/_CPack_Packages/Linux/RPM
%define _rpmfilename harbour-gcompris-qt-@GCOMPRIS_MAJOR_VERSION@.@GCOMPRIS_MINOR_VERSION@-1.@BUILD_ARCH@.rpm
%define _unpackaged_files_terminate_build 0
%define _topdir @CMAKE_BINARY_DIR@/_CPack_Packages/Linux/RPM




%description
GCompris is a high quality educational software suite comprising of numerous activities for children aged 2 to 10.

# This is a shortcutted spec file generated by CMake RPM generator
# we skip _install step because CPack does that for us.
# We do only save CPack installed tree in _prepr
# and then restore it in build.
%prep
mv $RPM_BUILD_ROOT "@CMAKE_BINARY_DIR@/_CPack_Packages/Linux/RPM/tmpBBroot"
echo $RPM_BUILD_ROOT

#p build

%install
if [ -e $RPM_BUILD_ROOT ];
then
  rm -rf $RPM_BUILD_ROOT
fi
mv "@CMAKE_BINARY_DIR@/_CPack_Packages/Linux/RPM/tmpBBroot" $RPM_BUILD_ROOT

# >> macros
%define _requires_exclude /bin/sh
# << macros

%clean

%files
%defattr(-,root,root,-)
%dir "/usr"
%dir "/usr/bin"
"/usr/bin/harbour-gcompris-qt"
%dir "/usr/share"
%dir "/usr/share/applications"
"/usr/share/applications/harbour-gcompris-qt.desktop"
%dir "/usr/share/icons"
%dir "/usr/share/icons/hicolor"
%dir "/usr/share/icons/hicolor/86x86"
%dir "/usr/share/icons/hicolor/86x86/apps"
"/usr/share/icons/hicolor/86x86/apps/harbour-gcompris-qt.png"
%dir "/usr/share/harbour-gcompris-qt"
%dir "/usr/share/harbour-gcompris-qt/translations"
@TRANSLATION_GENERATED_FILES@
%dir "/usr/share/harbour-gcompris-qt/rcc"
@RCC_GENERATED_FILES@
%dir "/usr/share/harbour-gcompris-qt/lib"
%dir "/usr/share/harbour-gcompris-qt/lib/qml"
%dir "/usr/share/harbour-gcompris-qt/lib/qml/Box2D.2.0"
"/usr/share/harbour-gcompris-qt/lib/qml/Box2D.2.0/libBox2D.so"
"/usr/share/harbour-gcompris-qt/lib/qml/Box2D.2.0/qmldir"


%changelog
* Sat May  9 2015 Alex Smirnov <smirnoff.al@gmail.com>
Add translation files
* Sun Apr 12 2015 Johnny Jazeix <gcompris-devel@kde.org>
  First version for sailfishOS
